import numpy as np
import pandas as pd
import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
from keras.layers import GlobalAveragePooling2D, Dense, Flatten, BatchNormalization, Dropout
from keras.models import Model
import keras.applications.efficientnet as en
from keras.applications.resnet import ResNet50
from keras.applications.mobilenet_v2 import MobileNetV2
import keras
import scipy
# import tensorflow as tf
import os

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
PATH = "training_data/"
DEMO_PATH = "demo_data/1163.jpg"
DEMO_PATH_2 = "demo_data/1855.jpg"
USAGE_CLASS_INDICES = {0: 'Casual', 1: 'Ethnic', 2: 'Formal', 3: 'Party', 4: 'Smart Casual', 5: 'Sports'}
ARTICLE_CLASS_INDICES = {0: 'Baby Dolls', 1: 'Bath Robe', 2: 'Blazers', 3: 'Boxers', 4: 'Bra', 5: 'Briefs', 6: 'Camisoles', 7: 'Capris', 8: 'Churidar', 9: 'Dresses', 10: 'Dupatta', 11: 'Innerwear Vests', 12: 'Jackets', 13: 'Jeans', 14: 'Jeggings', 15: 'Jumpsuit', 16: 'Kurta Sets', 17: 'Kurtas', 18: 'Kurtis', 19: 'Leggings', 20: 'Lounge Pants', 21: 'Lounge Shorts', 22: 'Lounge Tshirts', 23: 'Nehru Jackets', 24: 'Night suits', 25: 'Nightdress', 26: 'Patiala', 27: 'Rain Jacket', 28: 'Robe', 29: 'Rompers', 30: 'Salwar', 31: 'Salwar and Dupatta', 32: 'Sarees', 33: 'Shapewear', 34: 'Shirts', 35: 'Shorts', 36: 'Shrug', 37: 'Skirts', 38: 'Stockings', 39: 'Suspenders', 40: 'Sweaters', 41: 'Sweatshirts', 42: 'Swimwear', 43: 'Tights', 44: 'Tops', 45: 'Track Pants', 46: 'Tracksuits', 47: 'Trousers', 48: 'Trunk', 49: 'Tshirts', 50: 'Tunics', 51: 'Waistcoat'}
SEASON_CLASS_INDICES = {0: 'Fall', 1: 'Spring', 2: 'Summer', 3: 'Winter'}
COLOUR_CLASS_INDICES = {0: 'Beige', 1: 'Black', 2: 'Blue', 3: 'Brown', 4: 'Burgundy', 5: 'Charcoal', 6: 'Coffee Brown', 7: 'Cream', 8: 'Green', 9: 'Grey', 10: 'Grey Melange', 11: 'Khaki', 12: 'Lavender', 13: 'Lime Green', 14: 'Magenta', 15: 'Maroon', 16: 'Mauve', 17: 'Multi', 18: 'Mushroom Brown', 19: 'Mustard', 20: 'Navy Blue', 21: 'Nude', 22: 'Off White', 23: 'Olive', 24: 'Orange', 25: 'Peach', 26: 'Pink', 27: 'Purple', 28: 'Red', 29: 'Rose', 30: 'Rust', 31: 'Sea Green', 32: 'Skin', 33: 'Tan', 34: 'Teal', 35: 'Turquoise Blue', 36: 'White', 37: 'Yellow'}

def get_gen(img_gen, subset, df, category):
    return img_gen.flow_from_dataframe(
        dataframe=df,
        directory=PATH + "images",
        x_col="image",
        y_col=category,
        target_size=(96,96),
        subset=subset
    )

def load_data(category, df_endpoint, test_df_startpoint):
    """
    Loads data from training_data and returns training, validaiton and 
    test image generators.
    """
    master_df = pd.read_csv(PATH + "styles.csv", on_bad_lines='skip')
    master_df["image"] = master_df.apply(lambda row: str(row['id']) + ".jpg", axis=1)
    # apparel_df = master_df[(master_df["masterCategory"] == "Apparel") & (master_df["articleType"].notna())]
    not_apparel_df = master_df[(master_df["masterCategory"] != "Apparel")]
    #apparel_df_extra = master_df[(master_df["masterCategory"] == "Apparel")].iloc[7000:, :]

    if category == "articleType":
        apparel_df = master_df[(master_df["masterCategory"] == "Apparel")].iloc[0:7000, :]
    else:
        apparel_df = master_df[(master_df["masterCategory"] == "Apparel") & (master_df[category].notna())].iloc[0:7000, :]

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
    train_gen = get_gen(img_gen, "training", df, category)
    val_gen = get_gen(img_gen, "validation", df, category)
    test_gen = get_gen(img_gen_test, "training", test_df, category)

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

def load_all_models():
    print('\n')
    print("Loading all models")
    usage_model = keras.models.load_model('usage')
    article_model = keras.models.load_model('articleType')
    season_model = keras.models.load_model('season')
    bc_model = keras.models.load_model('baseColour')
    return article_model, usage_model, season_model, bc_model

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

def train_single_model(model, num, load1, load2):
    print('\n')
    print("Training " + model + " model now")
    train_gen, val_gen, test_gen = load_data(model, load1, load2)
    rec_model = train_model(train_gen, val_gen, num)
    rec_model.save(model)
    # test_model(rec_model, test_gen)

    # class_indices = {value: key for key, value in train_gen.class_indices.items()}
    # print(class_indices)
    # return rec_model, class_indices
    
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
    # article_model = train_single_model("article")
    # usage_model = train_single_model("usage")
    # season_model = train_single_model("season")
    # bc_model = train_single_model("bc")
    # train_single_model("articleType", 3, 3000, 2500)
    # train_single_model("usage", 1, 4000, 4000)
    # train_single_model("season", 3, 4000, 4000)
    train_single_model("baseColour", 3, 4000, 4000)

    article_model, usage_model, season_model, bc_model = load_all_models()

    print("\n predicting")
    # article_prediction = predict(article_model[0], article_model[1], DEMO_PATH_2)
    # usage_prediction = predict(usage_model[0], usage_model[1], DEMO_PATH_2)
    # season_prediction = predict(season_model[0], season_model[1], DEMO_PATH_2)
    # bc_prediction = predict(bc_model[0], bc_model[1], DEMO_PATH_2)
    article_prediction = predict(article_model, ARTICLE_CLASS_INDICES, DEMO_PATH_2)
    usage_prediction = predict(usage_model, USAGE_CLASS_INDICES, DEMO_PATH_2)
    season_prediction = predict(season_model, SEASON_CLASS_INDICES, DEMO_PATH_2)
    bc_prediction = predict(bc_model, COLOUR_CLASS_INDICES, DEMO_PATH_2)

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



