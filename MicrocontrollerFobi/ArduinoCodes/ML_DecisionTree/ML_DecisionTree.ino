#include <Wire.h>
#include "Adafruit_AS726x.h"
#include "DecisionTree.h"

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
    ams.drvOn();  //uncomment this if you want to use the driver LED for readings
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
    float pred[6] = { m[0], m[1], m[2], m[3], m[4], m[5] };
    float label = clf.predict(pred);
    Serial.print(label);
    Serial.println();
  }
  ams.drvOff();
}