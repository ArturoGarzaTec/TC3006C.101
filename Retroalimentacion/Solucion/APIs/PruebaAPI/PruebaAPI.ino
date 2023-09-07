#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

const char* ssid = "INFINITUM1DC6_2.4";
const char* password = "Mp83485845";
const char* fastAPIEndpoint = "http://192.168.1.79:8001/fastapi-passengers";

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

  // DeserializationError err = deserializeJson(doc, json);
  // if (err) {
  //   Serial.print("Error: ");
  //   Serial.println(err.c_str());
  //   return;
  // }
  // deserializeJson(doc, json);

  // Serial.print("Age: ");
  // int test = doc[0]["Age"];
  // Serial.println(test);

  server.on("/esp32-passengers", HTTP_POST, [](AsyncWebServerRequest *request){}, NULL, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
  // Create a DynamicJsonDocument to hold the data
  DynamicJsonDocument doc(2048);
  
  // Deserialize the JSON data
  if (deserializeJson(doc, (const char*)data) != DeserializationError::Ok) {
    request->send(400, "text/plain", "Invalid JSON");
    return;
  }

  // Serialize the JSON object to a string
  String output;
  serializeJson(doc, output);
  Serial.println(output);  // Print the serialized JSON payload

  // Initialize the HTTPClient and set the headers
  HTTPClient client;
  client.begin("http://192.168.1.79:8001/fastapi-passengers");
  client.addHeader("Content-Type", "application/json");

  // Send the POST request and get the response
  int httpResponseCode = client.POST(output);
  Serial.println(httpResponseCode);  // Print the HTTP response code

  // Get the response payload
  String responsePayload = client.getString();
  Serial.println(responsePayload);  // Print the entire response

  // Send the response payload back to the client
  request->send(200, "application/json", responsePayload);

  // End the HTTPClient
  client.end();
});


  server.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
}
