import 'package:flutter/material.dart';
import '../../../shared/widgets/primary_button.dart';
import 'package:firebase_auth/firebase_auth.dart';

class LoginScreen extends StatelessWidget {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  String email = "";
  String password = "";
  final _auth = FirebaseAuth.instance;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Login")),
      body: Stack(
        children: [
          SizedBox.expand(
            child: Image.asset("assets/images/222.png", fit: BoxFit.cover),
          ),
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.transparent, Colors.black.withOpacity(0.0)],
              ),
            ),
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
                  text: "Login",
                  onPressed: () async {
                    try {
                      final newUser = await _auth.signInWithEmailAndPassword(
                        email: email,
                        password: password,
                      );
                      final user = _auth.currentUser;
                      if (user != null) {
                        Navigator.pushReplacementNamed(context, "/home");
                        print(user.uid);
                        print("       ");
                        print(await user.getIdToken());
                      }
                    } catch (e) {
                      print(e);
                    }
                  },
                ),
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, "/register");
                  },
                  child: Text("Create Account"),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
