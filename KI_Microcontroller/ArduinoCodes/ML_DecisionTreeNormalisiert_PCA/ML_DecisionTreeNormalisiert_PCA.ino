#include <Wire.h>
#include "Adafruit_AS726x.h"
#include "decTreeClassifier.h"
#include "pca.h"

Eloquent::ML::Port::DecisionTree clf;
Eloquent::ML::Port::PCA pca;

Adafruit_AS726x ams;
uint16_t mInt[AS726x_NUM_CHANNELS];
float m[AS726x_NUM_CHANNELS];

bool button = false;
void setup() {
  pinMode(2, INPUT);
  Serial.begin(9600);
  Wire.begin();
  if (!ams.begin()) {
    Serial.println("could not connect to sensor! Please check your wiring.");
    while (1)
      ;
  }
}

void loop() {
  button = digitalRead(2);
  if (button) {
    ams.drvOn();
    ams.startMeasurement();
    bool rdy = false;
    while (!rdy) {
      delay(5);
      rdy = ams.dataReady();
    }
    ams.readRawValues(mInt);
    for (int z = 0; z < 6; z++) {
      m[z] = (float)mInt[z];
    }
    float pca_input[6] = { m[0], m[1], m[2], m[3], m[4], m[5] };
    float pca_output[3];
    pca.transform(pca_input, pca_output);
    
    float label = clf.predict(pca_output);
    Serial.println(label);
  }
  ams.drvOff();
}