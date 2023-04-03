import numpy as np
import pandas as pd
from keras.preprocessing.image import ImageDataGenerator
from keras.layers import GlobalAveragePooling2D, Dense
from keras.models import Model
import keras.applications.efficientnet as en
from keras.applications.mobilenet_v2 import MobileNetV2
# import tensorflow as tf
import os

PATH = "backend/training_data/"

# Loading the labels 
df = pd.read_csv(PATH + "styles.csv", nrows=5000)
df["image"] = df.apply(lambda row: str(row['id']) + ".jpg", axis=1)
print(df)

img_gen = ImageDataGenerator(
    rescale=1/244.,
    validation_split=0.2
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

num_classes = len(train_gen.class_indices)

# base_model = en.EfficientNetB3(include_top=False, weights="imagenet", input_shape=(96, 96, 3), pooling='max')
base_model = MobileNetV2(weights="imagenet", input_shape=(96, 96, 3), include_top=False)
base_model.save("weights.h5")
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation="relu")(x)
predictions = Dense(num_classes, activation="softmax")(x)

model = Model(inputs=base_model.input, outputs=predictions)

for layer in base_model.layers:
    layer.trainable = False

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.summary()

# print(train_gen.class_indices)
# print(train_gen.classes)
