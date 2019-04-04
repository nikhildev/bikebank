import 'package:flutter/material.dart';

class Search extends StatefulWidget {
  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  final searchTextController = TextEditingController();

  _handleSearch() {
    debugPrint(searchTextController.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: <Widget>[
            TextField(
              autofocus: true,
              decoration:
                  InputDecoration(hintText: 'Enter a bike id to search'),
              maxLength: 10,
              maxLengthEnforced: true,
              controller: searchTextController,
            ),
            RaisedButton(
              child: Text('Search'),
              onPressed: () {
                _handleSearch();
              },
            )
          ],
        ),
      ),
    );
  }
}
