import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  _handleGoogleLoginClick() {
    debugPrint('Clicked me');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        margin: EdgeInsets.all(64),
        child: Column(
          children: <Widget>[
            RaisedButton(
              onPressed: this._handleGoogleLoginClick,
              child: Text('Google'),
            )
          ],
        ),
      ),
    );
  }
}
