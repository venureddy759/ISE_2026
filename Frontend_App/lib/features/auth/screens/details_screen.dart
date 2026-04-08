import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../../shared/widgets/primary_button.dart';

class DetailsScreen extends StatefulWidget {
  final User user;

  const DetailsScreen({super.key, required this.user});

  @override
  State<DetailsScreen> createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  final firstNameController = TextEditingController();
  final lastNameController = TextEditingController();

  String? selectedCity;
  String? selectedState;
  String? selectedBusiness;

  final cities = ["Chennai", "Bangalore", "Hyderabad"];
  final states = ["Tamil Nadu", "Karnataka", "Telangana"];
  final businesses = ["None", "Startup", "Retail", "Finance"];

  Widget _dropdown({
    required String hint,
    required String? value,
    required List<String> items,
    required Function(String?) onChanged,
  }) {
    return DropdownButtonFormField<String>(
      value: value,
      decoration: InputDecoration(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
      hint: Text(hint),
      items: items.map((item) {
        return DropdownMenuItem(value: item, child: Text(item));
      }).toList(),
      onChanged: onChanged,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Complete Profile")),
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
                  controller: firstNameController,
                  decoration: const InputDecoration(
                    labelText: "First Name",
                    border: OutlineInputBorder(),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                ),
                const SizedBox(height: 20),

                TextField(
                  controller: lastNameController,
                  decoration: const InputDecoration(
                    labelText: "Last Name",
                    border: OutlineInputBorder(),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                ),
                const SizedBox(height: 20),

                _dropdown(
                  hint: "Select City",
                  value: selectedCity,
                  items: cities,
                  onChanged: (value) {
                    setState(() {
                      selectedCity = value;
                    });
                  },
                ),
                const SizedBox(height: 20),

                _dropdown(
                  hint: "Select State",
                  value: selectedState,
                  items: states,
                  onChanged: (value) {
                    setState(() {
                      selectedState = value;
                    });
                  },
                ),
                const SizedBox(height: 20),

                _dropdown(
                  hint: "Select Business",
                  value: selectedBusiness,
                  items: businesses,
                  onChanged: (value) {
                    setState(() {
                      selectedBusiness = value;
                    });
                  },
                ),
                const SizedBox(height: 30),

                PrimaryButton(
                  text: "Continue",
                  onPressed: () {
                    print("UID: ${widget.user.uid}");
                    print("First: ${firstNameController.text}");
                    print("Last: ${lastNameController.text}");
                    print("City: $selectedCity");
                    print("State: $selectedState");
                    print("Business: $selectedBusiness");

                    Navigator.pushReplacementNamed(context, "/home");
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
