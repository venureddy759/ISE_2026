import 'package:flutter/material.dart';
import '../../../shared/widgets/primary_button.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          /// 🔥 FULL SCREEN IMAGE (FIXED)
          SizedBox.expand(
            child: Image.asset(
              "assets/images/policylens.png",
              fit: BoxFit.cover,
            ),
          ),

          /// 🔥 GRADIENT OVERLAY (important for visibility)
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.transparent, Colors.black.withOpacity(0.0)],
              ),
            ),
          ),

          /// 🔥 BUTTON (OVERLAY)
          Positioned(
            left: 191,
            right: 20,
            bottom: 90,
            child: SafeArea(
              child: PrimaryButton(
                text: "Get Started",
                onPressed: () {
                  Navigator.pushNamed(context, "/login");
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
