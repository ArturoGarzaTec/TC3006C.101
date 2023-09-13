# Versión de Scikit-learn debe ser 1.2.2 para que funcione
from typing import List
import joblib
import pandas as pd
import uvicorn
from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
model = joblib.load("random_forest_model.pkl")

# Define CORS settings
origins = ["*"]  # Change this to the allowed origins of your application

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can specify specific HTTP methods here (e.g., ["GET", "POST"])
    allow_headers=["*"],  # You can specify specific HTTP headers here (e.g., ["Authorization"])
)


# Modelo json a recibir
class Passenger(BaseModel):
    PassengerId: int
    Pclass: int
    Age: int
    Sex: int
    IsAlone: int
    Fare: int
    Embarked: int
    Title: int


@app.get("/")
async def home():
    return "Hi"


@app.post("/fastapi-passengers")
async def passengers(passengers: List[Passenger]):
    data = jsonable_encoder(passengers)

    df = pd.DataFrame(data)
    test_df = df.drop("PassengerId", axis=1)
    passenger_id_df = pd.DataFrame(df["PassengerId"])
    predictions = model.predict(test_df).tolist()
    predictions_df = pd.DataFrame(predictions, columns=["Prediction"])

    final_data = pd.concat([passenger_id_df, predictions_df], axis=1)
    return final_data.to_dict(orient="records")

if __name__ == "__main__":
    uvicorn.run("random_forest_api:app", host="0.0.0.0", port=8001, reload=True)

# Correr en terminal: uvicorn random_forest_api:app --reload
