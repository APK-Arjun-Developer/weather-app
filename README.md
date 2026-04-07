# SkyCast - Weather Dashboard

A professional, feature-rich weather dashboard application built with modern web technologies. Get real-time weather updates, 5-day forecasts, and manage your favorite cities with an intuitive interface.

## 🌟 Features

- **Real-Time Weather Data**: Get current weather conditions for any city worldwide
- **5-Day Forecast**: View detailed weather predictions for the next 5 days
- **Geolocation Support**: Automatically fetch weather for your current location
- **Favorite Cities**: Save and quickly access weather for your favorite locations
- **Search History**: Tracks your recent searches for quick access
- **Unit Toggle**: Switch between Celsius/Fahrenheit and metric/imperial units
- **Dark Mode**: Easy-on-the-eyes dark theme for nighttime browsing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Delightful UI transitions powered by Framer Motion

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks with localStorage persistence values

## 📋 Prerequisites

- Node.js 16+ or Bun runtime
- OpenWeather API key (free tier available)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd weather-app
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using Bun:
```bash
bun install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` and add your OpenWeather API key:

```bash
cp .env.example .env
```

Then edit `.env`:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

### 4. Start Development Server

Using npm:
```bash
npm run dev
```

Or using Bun:
```bash
bun run dev
```

The app will be available at `http://localhost:3000`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run clean` - Remove build artifacts
- `npm run lint` - Type check with TypeScript

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── common/         # Common utility components (toggles, etc.)
├── features/           # Feature-specific components
│   ├── search/         # Search functionality
│   ├── weather/        # Weather display components
│   └── favorites/      # Favorites management
├── hooks/              # Custom React hooks
├── api/                # API client and services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main app component
```

## 🌐 API Integration

The app uses the [OpenWeather One Call API](https://openweathermap.org/api/one-call-3) for:
- Current weather conditions
- 5-day weather forecasts
- Geolocation-based weather lookup

## 🎨 Customization

### Styling
Styling is handled with Tailwind CSS. Customize colors and themes in `tailwind.config.js`

### Weather Units
Default unit is metric (Celsius, m/s). Users can toggle to imperial (Fahrenheit, mph) via the UI toggle.

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## 🔒 Security

- API keys are loaded from environment variables (never hardcoded)
- Sensitive data does not persist beyond the session
- Uses HTTPS for all external API calls

## 📈 Performance

- Optimized bundle size using Vite
- Lazy loading of forecast data
- Efficient re-rendering with React hooks
- LocalStorage caching for user preferences

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- Weather alerts and notifications
- Air quality information
- Historical weather data
- Advanced search filters
- Weather maps integration
- Multi-language support

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

Built with precision and care for weather enthusiasts everywhere! 🌤️
