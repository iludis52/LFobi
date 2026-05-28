#include <Wire.h>
#include "Adafruit_AS726x.h"
#include <SeeedGrayOLED.h>

Adafruit_AS726x ams;
uint16_t sensorValues[AS726x_NUM_CHANNELS];
char *farben[] = { "vio:", "blu:", "grn:", "yel:", "ora:", "red:" };
int zaehler = 0;
bool button = false;
bool altbutton = false;
void setup() {
  pinMode(2, INPUT);
  Serial.begin(9600);
  Wire.begin();
  pinMode(LED_BUILTIN, OUTPUT);
  if (!ams.begin()) {
    Serial.println("could not connect to sensor! Please check your wiring.");
    while (1)
      ;
  }
  SeeedGrayOled.init(SH1107G);
  SeeedGrayOled.clearDisplay();
  SeeedGrayOled.setNormalDisplay();
  SeeedGrayOled.setVerticalMode();
  SeeedGrayOled.setTextXY(0, 0);
  SeeedGrayOled.putString("Farbwerte:");
  for (int i = 0; i < 6; i++) {
    SeeedGrayOled.setTextXY(i + 1, 0);
    SeeedGrayOled.putString(farben[i]);
  }
  Serial.println("violet,blue,green,yellow,orange,red,label");
}

void loop() {
  uint8_t temp = ams.readTemperature();
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

      for (int i = 0; i < 6; i++) {
        SeeedGrayOled.setTextXY(i + 1, 40);
        SeeedGrayOled.putString("       ");
        SeeedGrayOled.setTextXY(i + 1, 40);
        SeeedGrayOled.putNumber(sensorValues[i]);
      }
      ams.drvOff();
    }
  }
  if (!button) {
    altbutton = false;
  }
}