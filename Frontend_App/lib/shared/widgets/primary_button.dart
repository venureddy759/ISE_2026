import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

class PrimaryButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;

  const PrimaryButton({
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 90,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          shape: CircleBorder(),
          elevation: 6,
        ),
        onPressed: onPressed,
        child: Text(
          text,
          style: TextStyle(fontSize: 15, color: Colors.black),
        ),
      ),
    );
  }
}
