import numpy as np
import pandas as pd
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
    rescale=1/256.,
    validation_split=0.2
    )

    img_gen_test = ImageDataGenerator(
        rescale=1/256.
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

# Run the code:
if __name__ == "__main__":
    train_all_models()
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



