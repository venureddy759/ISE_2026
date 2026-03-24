import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String selectedCategory = "All";

  final List<String> categories = [
    "All",
    "Education",
    "Finance",
    "Health",
    "Agriculture",
  ];

  final List<Map<String, String>> policies = [
    {
      "title": "New Education Policy",
      "category": "Education",
      "description": "Changes in higher education structure",
    },
    {
      "title": "Tax Amendment 2024",
      "category": "Finance",
      "description": "Updated tax slabs introduced",
    },
    {
      "title": "Healthcare Reform",
      "category": "Health",
      "description": "Improved rural healthcare system",
    },
  ];

  @override
  Widget build(BuildContext context) {
    // Filter policies
    final filteredPolicies = selectedCategory == "All"
        ? policies
        : policies.where((p) => p["category"] == selectedCategory).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text("PolicyLens"),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: DropdownButton<String>(
              value: selectedCategory,
              underline: SizedBox(),
              items: categories.map((String category) {
                return DropdownMenuItem(value: category, child: Text(category));
              }).toList(),
              onChanged: (value) {
                setState(() {
                  selectedCategory = value!;
                });
              },
            ),
          ),
        ],
      ),

      /// 🔹 BODY
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: filteredPolicies.length,
        itemBuilder: (context, index) {
          final policy = filteredPolicies[index];

          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: ListTile(
              title: Text(policy["title"]!),
              subtitle: Text(policy["description"]!),
              trailing: Text(policy["category"]!),
            ),
          );
        },
      ),
    );
  }
}
