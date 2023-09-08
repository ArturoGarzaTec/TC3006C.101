#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

const char* ssid = "MMM iPhone";
const char* password = "mayonesa";
const char* fastAPIEndpoint = "http://172.20.10.3:8001/fastapi-passengers";

HTTPClient client;
AsyncWebServer server(8002);

// char json[] = "[{\"Pclass\":1,\"Age\":38,\"Sex\":0,\"Fam\":1,\"Fare\":3,\"Embarked\":1}]";
// DynamicJsonDocument doc(1024);

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/esp32-passengers", HTTP_POST, [](AsyncWebServerRequest *request){}, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
  // Create a DynamicJsonDocument to hold the data
  DynamicJsonDocument doc(2048);
  if (deserializeJson(doc, (const char*)data) != DeserializationError::Ok) {
    request->send(400, "text/plain", "Invalid JSON");
    return;
  }

  // Serialize the JSON object to a string
  String output;
  serializeJson(doc, output);
  Serial.println(output);

  HTTPClient client;
  client.begin(fastAPIEndpoint);
  client.addHeader("Content-Type", "application/json");

  int httpResponseCode = client.POST(output);
  Serial.println(httpResponseCode);

  String responsePayload = client.getString();
  Serial.println(responsePayload);


  AsyncWebServerResponse *response = request->beginResponse(200, "application/json", responsePayload);
  response->addHeader("Access-Control-Allow-Origin", "*");
  request->send(response);

  client.end();
});

  server.on("/esp32-passengers", HTTP_OPTIONS, [](AsyncWebServerRequest *request){
    AsyncWebServerResponse *response = request->beginResponse(200);
    response->addHeader("Access-Control-Allow-Origin", "*");
    response->addHeader("Access-Control-Allow-Methods", "POST");
    response->addHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    request->send(response);
  });


  server.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
}
