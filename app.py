from flask import Flask, render_template, request
import requests
import datetime
import os  

app = Flask(__name__)

# Read API key from environment variable
API_KEY = os.getenv("WEATHER_API_KEY")

if not API_KEY:
    raise ValueError("Missing API Key! Set the 'WEATHER_API_KEY' environment variable.")

# Unix timestamp Conversion
def datetimeformat(value):
    return datetime.datetime.fromtimestamp(value).strftime('%I:%M %p')

app.jinja_env.filters['datetimeformat'] = datetimeformat  

@app.route('/', methods=['GET', 'POST'])
def index():
    weather_data = None
    pollution_data = None
    temperature_forecast = None

    if request.method == 'POST':
        city = request.form['city']
        country_code = "IN"  

        # Get city coordinates
        geo_url = f"https://api.openweathermap.org/geo/1.0/direct?q={city},{country_code}&limit=1&appid={API_KEY}"
        geo_response = requests.get(geo_url)

        if geo_response.status_code == 200 and geo_response.json():
            location = geo_response.json()[0]
            lat, lon = location['lat'], location['lon']

            # API for Weather & Pollution
            weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
            pollution_url = f"https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}"

            weather_response = requests.get(weather_url)
            pollution_response = requests.get(pollution_url)

            if weather_response.status_code == 200:
                weather_data = weather_response.json()

            if pollution_response.status_code == 200:
                pollution_data = pollution_response.json()

            # API for Temperature Forecast
            today = datetime.datetime.now().strftime("%Y-%m-%d")
            forecast_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m&start_date={today}&end_date={today}&timezone=Asia%2FKolkata"
            forecast_response = requests.get(forecast_url)

            if forecast_response.status_code == 200:
                temperature_forecast = forecast_response.json()

    return render_template('index.html', weather_data=weather_data, pollution_data=pollution_data, temperature_forecast=temperature_forecast)

if __name__ == '__main__':
    app.run(debug=True)
