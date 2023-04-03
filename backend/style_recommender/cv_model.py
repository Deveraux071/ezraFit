import numpy as np
import pandas as pd
from keras.preprocessing.image import ImageDataGenerator
from keras.layers import GlobalAveragePooling2D, Dense, Flatten, BatchNormalization
from keras.models import Model
import keras.applications.efficientnet as en
from keras.applications.mobilenet_v2 import MobileNetV2
import scipy
# import tensorflow as tf
import os

PATH = "backend/training_data/"

# Loading the labels 
# df = pd.read_csv(PATH + "styles.csv", nrows=5000)
# df["image"] = df.apply(lambda row: str(row['id']) + ".jpg", axis=1)
# print(df)

master_df = pd.read_csv(PATH + "styles.csv", nrows=10000, on_bad_lines='skip')
master_df["image"] = master_df.apply(lambda row: str(row['id']) + ".jpg", axis=1)
print(master_df)

df = master_df.iloc[:5030,:]
test_df = master_df.iloc[5020:,:]

print(df)
print(test_df)

# test_df = pd.read_csv(PATH + "styles.csv", nrows=7000, skiprows=5000)
# test_df["image"] = test_df.apply(lambda row: str(row['id']) + ".jpg", axis=1)
# print(test_df)

img_gen = ImageDataGenerator(
    rescale=1/244.,
    validation_split=0.2
)

img_gen_test = ImageDataGenerator(
    rescale=1/244.
)

train_gen = img_gen.flow_from_dataframe(
    dataframe=df,
    directory=PATH + "images",
    x_col="image",
    y_col="articleType",
    target_size=(96,96),
    subset="training"
)

val_gen = img_gen.flow_from_dataframe(
    dataframe=df,
    directory=PATH + "images",
    x_col="image",
    y_col="articleType",
    target_size=(96,96),
    subset="validation"
)

test_gen = img_gen_test.flow_from_dataframe(
    dataframe=test_df,
    directory=PATH + "images",
     x_col="image",
    y_col="articleType",
    target_size=(96,96),
    subset="training"
)
# print(test_gen.classes)
num_classes = len(train_gen.class_indices)

# base_model = en.EfficientNetB3(include_top=False, weights="imagenet", input_shape=(96, 96, 3), pooling='max')
base_model = MobileNetV2(weights="imagenet", input_shape=(96, 96, 3), include_top=False)
base_model.save("weights.h5")
x = base_model.output
x = GlobalAveragePooling2D()(x)
# x = Flatten()(x)
x = Dense(1024, activation="relu")(x)
predictions = Dense(num_classes, activation="softmax")(x)

model = Model(inputs=base_model.input, outputs=predictions)

for layer in base_model.layers:
    layer.trainable = False

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(
    train_gen,
    epochs=1,
    verbose=1,
    steps_per_epoch=train_gen.samples // 32,
    validation_data=val_gen,
    validation_steps=val_gen.samples // 32,
    )

model.save('backend/training_data/articleTypeModel.h5')
model.save_weights('backend/training_data/articleTypeModelWeights.h5')

# # predictions = model.predict(test_gen)
# # print(predictions)
# print(test_gen.classes)

# predictions = model.predict(test_gen)
# print(predictions)
# prediction_class_indices = np.argmax(predictions, axis=1)
# print(prediction_class_indices)
# # predicition_classes = []
# # rev_class_indices = {value: key for key, value in train_gen.class_indices.items()}
# # print(rev_class_indices)
# # for i in prediction_class_indices:
# #     predicition_classes.append(rev_class_indices[i])
# # print(predicition_classes)
# accuracy = 0
# for i in range(0, len(prediction_class_indices)):
#     if prediction_class_indices[i] == test_gen.classes[i]:
#         accuracy += 1
# print(accuracy/len(prediction_class_indices))

results = model.evaluate(test_gen)
print("Test Accuracy is" + str(results[1]))

# print(train_gen.class_indices)
# print(train_gen.classes)
