import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<String> fetchHello() async {
  final response = await http.get(Uri.parse("http://127.0.0.1:3000/"));

  if (response.statusCode == 200) {
    return response.body;
  } else {
    throw Exception("Failed to load message");
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String selectedCategory = "All";
  String helloMessage = "Loading...";

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
  void initState() {
    super.initState();
    loadHello();
  }

  void loadHello() async {
    try {
      final msg = await fetchHello();
      setState(() {
        helloMessage = msg;
      });
    } catch (e) {
      setState(() {
        helloMessage = "Error loading message";
      });
    }
  }

  void onMenuTap(String title) {
    Navigator.pop(context);

    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text("$title clicked")));
  }

  @override
  Widget build(BuildContext context) {
    final filteredPolicies = selectedCategory == "All"
        ? policies
        : policies.where((p) => p["category"] == selectedCategory).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text("PolicyLens"),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: _buildFancyDropdown(),
          ),
        ],
      ),

      drawer: Drawer(
        child: SafeArea(
          child: Column(
            children: [
              UserAccountsDrawerHeader(
                accountName: const Text("User Name"),
                accountEmail: const Text("user@email.com"),
                currentAccountPicture: const CircleAvatar(
                  backgroundImage: AssetImage("assets/images/profile.png"),
                  // if you don't have image yet, use:
                  // child: Icon(Icons.person, size: 40),
                ),
                decoration: BoxDecoration(color: Colors.amber.shade700),
              ),

              ListTile(
                leading: const Icon(Icons.settings),
                title: const Text("Settings"),
                onTap: () => onMenuTap("Settings"),
              ),
              ListTile(
                leading: const Icon(Icons.privacy_tip),
                title: const Text("Privacy Details"),
                onTap: () => onMenuTap("Privacy Details"),
              ),
              ListTile(
                leading: const Icon(Icons.person),
                title: const Text("Change User Details"),
                onTap: () => onMenuTap("Change User Details"),
              ),
              ListTile(
                leading: const Icon(Icons.photo_camera),
                title: const Text("Edit / View Profile Photo"),
                onTap: () => onMenuTap("Edit / View Profile Photo"),
              ),
            ],
          ),
        ),
      ),

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
              subtitle: Text(helloMessage),
              trailing: Text(policy["category"]!),
            ),
          );
        },
      ),
    );
  }

  Widget _buildFancyDropdown() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: Colors.grey.shade200,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.grey.shade400),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: selectedCategory,
          icon: const Icon(Icons.keyboard_arrow_down_rounded),
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: Colors.black,
          ),
          items: categories.map((category) {
            return DropdownMenuItem<String>(
              value: category,
              child: Row(
                children: [
                  Icon(
                    _getCategoryIcon(category),
                    size: 18,
                    color: Colors.amber.shade700,
                  ),
                  const SizedBox(width: 8),
                  Text(category),
                ],
              ),
            );
          }).toList(),
          onChanged: (value) {
            setState(() {
              selectedCategory = value!;
            });
          },
        ),
      ),
    );
  }

  IconData _getCategoryIcon(String category) {
    switch (category) {
      case "Education":
        return Icons.school;
      case "Finance":
        return Icons.attach_money;
      case "Health":
        return Icons.health_and_safety;
      case "Agriculture":
        return Icons.agriculture;
      default:
        return Icons.apps;
    }
  }
}
