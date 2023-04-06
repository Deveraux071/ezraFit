import numpy as np
import pandas as pd
import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
from keras.layers import GlobalAveragePooling2D, Dense, Flatten, BatchNormalization, Dropout
from keras.models import Model
import keras.applications.efficientnet as en
from keras.applications.resnet import ResNet50
from keras.applications.mobilenet_v2 import MobileNetV2
import scipy
# import tensorflow as tf
import os

PATH = "backend/training_data/"
DEMO_PATH = "backend/demo_data/1163.jpg"
DEMO_PATH_2 = "backend/demo_data/1855.jpg"

def load_data(category, df_endpoint, test_df_startpoint):
    """
    Loads data from training_data and returns training, validaiton and 
    test image generators.
    """
    master_df = pd.read_csv(PATH + "styles.csv", on_bad_lines='skip')
    master_df["image"] = master_df.apply(lambda row: str(row['id']) + ".jpg", axis=1)
    # apparel_df = master_df[(master_df["masterCategory"] == "Apparel") & (master_df["articleType"].notna())]
    not_apparel_df = master_df[(master_df["masterCategory"] != "Apparel")]
    apparel_df_extra = master_df[(master_df["masterCategory"] == "Apparel")].iloc[7000:, :]
    if category == "articleType":
        apparel_df = master_df[(master_df["masterCategory"] == "Apparel")].iloc[0:7000, :]
    elif category == "usage":
        apparel_df = master_df[(master_df["masterCategory"] == "Apparel") & (master_df["usage"].notna())].iloc[0:7000, :]
    elif category == "baseColour":
        apparel_df = master_df[(master_df["masterCategory"] == "Apparel") & (master_df["baseColour"].notna())].iloc[0:7000, :]
    elif category == "season":
        apparel_df = master_df[(master_df["masterCategory"] == "Apparel") & (master_df["season"].notna())].iloc[0:7000, :]
    
    # Usage split
    df = apparel_df.iloc[:df_endpoint,:]
    test_df = apparel_df.iloc[test_df_startpoint:,:]
    print(df)
    print(test_df)

    img_gen = ImageDataGenerator(
    rescale=1/255.,
    validation_split=0.2
    )

    img_gen_test = ImageDataGenerator(
        rescale=1/255.
    )

    train_gen = img_gen.flow_from_dataframe(
    dataframe=df,
    directory=PATH + "images",
    x_col="image",
    y_col=category,
    target_size=(96,96),
    subset="training"
    )

    val_gen = img_gen.flow_from_dataframe(
        dataframe=df,
        directory=PATH + "images",
        x_col="image",
        y_col=category,
        target_size=(96,96),
        subset="validation"
    )

    test_gen = img_gen_test.flow_from_dataframe(
        dataframe=test_df,
        directory=PATH + "images",
        x_col="image",
        y_col=category,
        target_size=(96,96),
        subset="training"
    )

    return train_gen, val_gen, test_gen


def train_model(training_generator, validation_generator, ep):
    num_classes = len(training_generator.class_indices)
    base_model = en.EfficientNetB3(include_top=False, weights="imagenet", input_shape=(96, 96, 3), pooling='max')
    x = base_model.output
    x = BatchNormalization(axis=-1, momentum=0.99, epsilon=0.001)(x)
    x = Dense(256, activation="relu")(x)
    x = Dropout(rate=.45, seed=123)(x)
    predictions = Dense(num_classes, activation="softmax")(x)

    model = Model(inputs=base_model.input, outputs=predictions)

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    model.fit(
        training_generator,
        epochs=ep,
        verbose=1,
        steps_per_epoch=training_generator.samples // 32,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // 32,
        )

    return model

def test_model(model, test_generator):
    results = model.evaluate(test_generator)
    print("Test Accuracy is" + str(results[1]))

def train_all_models():
    print('\n')
    print("Training ArticleType Model Now")
    article_train_gen, article_val_gen, article_test_gen = load_data("articleType", 3000, 2500)
    article_model = train_model(article_train_gen, article_val_gen, 3)
    test_model(article_model, article_test_gen)

    # Usage Model:
    print('\n')
    print("Training usage model now")
    usage_train_gen, usage_val_gen, usage_test_gen = load_data("usage", 4000, 4000)
    usage_model = train_model(usage_train_gen, usage_val_gen, 1)
    test_model(usage_model, usage_test_gen)

    # baseColour Model:
    print('\n')
    print("Training baseColour model now")
    bc_train_gen, bc_val_gen, bc_test_gen = load_data("baseColour", 4000, 4000)
    bc_model = train_model(bc_train_gen, bc_val_gen, 3) 
    test_model(bc_model, bc_test_gen)

    # season Model:
    print('\n')
    print("Training season model now")
    season_train_gen, season_val_gen, season_test_gen = load_data("season", 4000, 4000)
    season_model = train_model(season_train_gen, season_val_gen, 3)
    test_model(season_model, season_test_gen)

    return article_model, usage_model, bc_model, season_model

def train_usage_model():
    print('\n')
    print("Training usage model now")
    usage_train_gen, usage_val_gen, usage_test_gen = load_data("usage", 4000, 4000)
    usage_model = train_model(usage_train_gen, usage_val_gen, 1)
    # test_model(usage_model, usage_test_gen)

    usage_class_indices = {value: key for key, value in usage_train_gen.class_indices.items()}
    print(usage_class_indices)
    return usage_model, usage_class_indices

def train_article_model():
    print('\n')
    print("Training ArticleType Model Now")
    article_train_gen, article_val_gen, article_test_gen = load_data("articleType", 3000, 2500)
    article_model = train_model(article_train_gen, article_val_gen, 3)
    # test_model(article_model, article_test_gen)

    article_class_indices = {value: key for key, value in article_train_gen.class_indices.items()}
    print(article_class_indices)
    return article_model, article_class_indices

def train_season_model():
    print('\n')
    print("Training season model now")
    season_train_gen, season_val_gen, season_test_gen = load_data("season", 4000, 4000)
    season_model = train_model(season_train_gen, season_val_gen, 3)
    # test_model(season_model, season_test_gen)

    season_class_indices = {value: key for key, value in season_train_gen.class_indices.items()}
    print(season_class_indices)
    return season_model, season_class_indices

def train_bc_model():
    print('\n')
    print("Training baseColour model now")
    bc_train_gen, bc_val_gen, bc_test_gen = load_data("baseColour", 4000, 4000)
    bc_model = train_model(bc_train_gen, bc_val_gen, 3) 
    # test_model(bc_model, bc_test_gen)

    bc_class_indices = {value: key for key, value in bc_train_gen.class_indices.items()}
    print(bc_class_indices)
    return bc_model, bc_class_indices
    
def predict(model, class_indices, path):
    image = tf.keras.preprocessing.image.load_img(path, target_size=(96, 96))
    image_data = np.asarray(image)
    expanded_image = np.expand_dims(image_data, axis=0)
    expanded_image = expanded_image
    result = model.predict(expanded_image/255)
    predicted_index = np.argmax(result, axis=1)
    print(predicted_index[0])
    return class_indices[predicted_index[0]]

# Run the code:
if __name__ == "__main__":
    # train_all_models()
    # print("\n training model")
    # trained_usage_model = train_usage_model()
    # print("\n predicting")
    # # prediction = predict(trained_usage_model[0], trained_usage_model[1], DEMO_PATH)
    # prediction2 = predict(trained_usage_model[0], trained_usage_model[1], DEMO_PATH_2)
    # print("1163")
    # # print(prediction)
    # print("1855")
    # print(prediction2)

    print("\n training models")
    article_model = train_article_model()
    usage_model = train_usage_model()
    season_model = train_season_model()
    bc_model = train_bc_model()

    print("\n predicting")
    article_prediction = predict(article_model[0], article_model[1], DEMO_PATH_2)
    usage_prediction = predict(usage_model[0], usage_model[1], DEMO_PATH_2)
    season_prediction = predict(season_model[0], season_model[1], DEMO_PATH_2)
    bc_prediction = predict(bc_model[0], bc_model[1], DEMO_PATH_2)

    print(article_prediction)
    print(usage_prediction)
    print(season_prediction)
    print(bc_prediction)

    print("Article: " + article_prediction)
    print("Usage: "+ usage_prediction)
    print("Season: "+ season_prediction)
    print("Colour: "+ bc_prediction)

    # ArticleType Model:
    # print("Training ArticleType Model Now")
    # article_train_gen, article_val_gen, article_test_gen = load_data("articleType", 3000, 2500)
    # article_model = train_model(article_train_gen, article_val_gen, 3)
    # test_model(article_model, article_test_gen)

    # # Usage Model:
    # print("Training usage model now")
    # usage_train_gen, usage_val_gen, usage_test_gen = load_data("usage", 4000, 4000)
    # usage_model = train_model(usage_train_gen, usage_val_gen, 1)
    # test_model(usage_model, usage_test_gen)

    # # baseColour Model:
    # print("Training baseColour model now")
    # bc_train_gen, bc_val_gen, bc_test_gen = load_data("baseColour", 4000, 4000)
    # bc_model = train_model(bc_train_gen, bc_val_gen, 3)
    # test_model(bc_model, bc_test_gen)

    # # season Model:
    # print("Training season model now")
    # season_train_gen, season_val_gen, season_test_gen = load_data("season", 4000, 4000)
    # season_model = train_model(season_train_gen, season_val_gen, 3)
    # test_model(season_model, season_test_gen)



