#include <Wire.h>
#include "Adafruit_AS726x.h"

Adafruit_AS726x ams;
uint16_t sensorValues[AS726x_NUM_CHANNELS];
bool button = false;
bool altbutton = false;
void setup() {
  pinMode(2, INPUT);
  Serial.begin(9600);
  Wire.begin();
  if (!ams.begin()) {
    Serial.println("could not connect to sensor! Please check your wiring.");
    while (1);
  }
  Serial.println("violet,blue,green,yellow,orange,red,label");
}

void loop() {
  button = digitalRead(2);
  if (button) {
    if (altbutton != button) {
      altbutton = button;
      ams.drvOn();  //uncomment this if you want to use the driver LED for readings
      ams.startMeasurement();
      bool rdy = false;
      while (!rdy) {
        delay(5);
        rdy = ams.dataReady();
      }
      ams.readRawValues(sensorValues);
      for (int i = 0; i < 6; i++) {
        Serial.print(sensorValues[i]);
        Serial.print(",");
      }
      Serial.println("color");
      ams.drvOff();
    }
  }
  if (!button) { altbutton = false; }
}