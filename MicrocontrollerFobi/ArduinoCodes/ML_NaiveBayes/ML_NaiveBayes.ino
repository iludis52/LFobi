#include <Wire.h>
#include "Adafruit_AS726x.h"
#include <SeeedGrayOLED.h>
#include "naivbayes.h"

Eloquent::ML::Port::GaussianNB clf;

Adafruit_AS726x ams;
uint16_t mInt[AS726x_NUM_CHANNELS];
float m[AS726x_NUM_CHANNELS];

char *farben[] = {"vio:", "blu:", "grn:", "yel:", "ora:" , "red:"};
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
    while (1);
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
}

void loop() {
  uint8_t temp = ams.readTemperature();
  ams.drvOn(); //uncomment this if you want to use the driver LED for readings
  ams.startMeasurement();
  bool rdy = false;
  while (!rdy) {
    delay(5);
    rdy = ams.dataReady();
  }
  ams.drvOff();
  ams.readRawValues(mInt);
  for (int z = 0; z < 6 ; z++) {
    m[z] = (float) mInt[z];
  }
  button = digitalRead(2);
  if (button) {
    float pred[6]={(m[0]-197.0)/(16720.0-197.0),(m[1]-229.0)/(11904.0-229.0),(m[2]-315.0)/(49085.0-315.0),(m[3]-354.0)/(51201.0-354.0),(m[4]-365.0)/(51201.0-365.0),(m[5]-236.0)/(19019.0-236.0)};float pred[6] = {m[0],m[1],m[2],m[3],m[4],m[5]};
    uint8_t label = clf.predict(pred);
    Serial.print(label);
    Serial.println();
    SeeedGrayOled.setTextXY(10, 0);
    SeeedGrayOled.putString("Predicted Label:");
    SeeedGrayOled.setTextXY(11, 0);
    SeeedGrayOled.putNumber(label);
  }
  if (!button && altbutton) {
    Serial.println("finished prediction");
  }
  for (int i = 0; i < 6; i++) {
    SeeedGrayOled.setTextXY(i + 1, 40);
    SeeedGrayOled.putString("       ");
    SeeedGrayOled.setTextXY(i + 1, 40);
    SeeedGrayOled.putNumber(m[i]);
  }

}
