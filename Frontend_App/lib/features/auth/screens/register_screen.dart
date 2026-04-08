import 'package:flutter/material.dart';
import '../../../shared/widgets/primary_button.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'details_screen.dart';

class RegisterScreen extends StatelessWidget {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  String email = "";
  String password = "";
  final _auth = FirebaseAuth.instance;

  RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Register")),
      body: Stack(
        children: [
          SizedBox.expand(
            child: Image.asset("assets/images/register.png", fit: BoxFit.cover),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextField(
                  controller: emailController,
                  decoration: InputDecoration(
                    labelText: "Email",
                    border: OutlineInputBorder(),
                  ),
                  onChanged: (value) {
                    email = value;
                  },
                ),
                SizedBox(height: 20),
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: "Password",
                    border: OutlineInputBorder(),
                  ),
                  onChanged: (value) {
                    password = value;
                  },
                ),
                SizedBox(height: 30),
                PrimaryButton(
                  text: "Create Account",
                  onPressed: () async {
                    try {
                      final newUser = await _auth
                          .createUserWithEmailAndPassword(
                            email: email,
                            password: password,
                          );
                      final user = _auth.currentUser;
                      if (user != null && context.mounted) {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                            builder: (_) => DetailsScreen(user: user),
                          ),
                        );
                      }
                    } catch (e) {
                      print(e);
                    }
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
