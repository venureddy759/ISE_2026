PolicyLens Complete Setup Guide


Prerequisites

Git
Node.js
npm
NestJS
Flutter
Android Studio / Visual Studio Code
Firebase
PostgreSQL
Google Chrome


1. Clone the Repository

git clone https://github.com/venureddy759/ISE_2026.git
cd ISE_2026

2. Frontend Setup (Web Frontend)

cd frontend
npm install
npm run dev

Frontend runs at:

Vite
http://localhost:5173


3. Backend Setup (NestJS)

cd backend
npm install
npm run start

Backend runs at:

http://localhost:3000


4. Frontend–Backend Connection

Frontend sends requests to:

Writing

http://localhost:3000

✅ Backend must run before testing frontend.


5. Authentication (Current Implementation)

Dummy authentication using localStorage
Login redirects to dashboard
Protected routes implemented
Logout functionality available


6. Common Frontend Issues and Fixes Tailwind CSS Not Working

Ensure index.css contains:

Writing

@tailwind base;
@tailwind components;
@tailwind utilities;

Then restart server.

npm Install Errors


rm -rf node_modules
npm install


7. Flutter Frontend Setup (Mobile App + Firebase)

Install:

Flutter SDK
Android Studio or Visual Studio Code
Emulator / physical device
Firebase account

Check Flutter:

Writing

flutter doctor


8. Configure Firebase for Android
Update android/build.gradle
Writing

classpath 'com.google.gms:google-services:4.3.15'

Update android/app/build.gradle
Writing

apply plugin: 'com.google.gms.google-services'


9. Install Flutter Firebase Dependencies

Writing

flutter pub add firebase_core
flutter pub add firebase_auth

OR manually:

Writing

dependencies:
firebase_core: latest_version
firebase_auth: latest_version

Then:

Writing

flutter pub get

10. Add Firebase Config File

Place:

Writing

android/app/google-services.json

⚠️ File removed from repo for security.

11. Initialize Firebase in Flutter

Update main.dart

Writing

import 'package/material.dart';
import 'package/firebase_core.dart';

void main() async {
WidgetsFlutterBinding.ensureInitialized();
await Firebase.initializeApp();
runApp(MyApp());
}

12. Run Flutter App
Writing

flutter run

13. Flutter Common Issues and Fixes
App crashes on startup

Ensure:

Writing

await Firebase.initializeApp();

No Firebase App Found

Firebase not initialized correctly.

google-services.json Missing

Ensure exact path:

Writing

android/app/google-services.json

Build Errors

Run:

Writing

flutter clean
flutter pub get
flutter run

14. Final System Architecture

Current architecture:

Flutter frontend / web frontend
Firebase authentication
NestJS backend APIs
PostgreSQL database
Google Gemini AI integration
file storage
scraper/API integration