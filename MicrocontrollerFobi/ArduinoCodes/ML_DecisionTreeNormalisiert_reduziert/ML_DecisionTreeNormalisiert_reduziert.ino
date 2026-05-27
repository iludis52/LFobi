#include <Wire.h>
#include "Adafruit_AS726x.h"
#include "decTreeClassifier.h"

Eloquent::ML::Port::DecisionTree clf;

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
    float pred[6] = { (m[0] - 197.0) / (16720.0 - 197.0), (m[1] - 229.0) / (11904.0 - 229.0), (m[2] - 315.0) / (49085.0 - 315.0), (m[3] - 354.0) / (51201.0 - 354.0), (m[4] - 365.0) / (51201.0 - 365.0), (m[5] - 236.0) / (19019.0 - 236.0) };
    float label = clf.predict(pred);
    Serial.println(label);
  }
  ams.drvOff();
}