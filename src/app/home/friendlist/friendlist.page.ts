import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.page.html',
  styleUrls: ['./friendlist.page.scss'],
})
export class FriendlistPage implements OnInit {
  searchBar: string
  constructor() { }

  friendList = [{
      "id": 1,
      "firstname": "Ana",
      "lastname": "Banana",
    },
    {
      "id": 2,
      "firstname": "Budi",
      "lastname": "Wahyudi",
    },
    {
      "id": 3,
      "firstname": "Caca",
      "lastname": "Marica",
    },
    {
      "id": 4,
      "firstname": "Denny",
      "lastname": "Setiawan",
    },
    {
      "id": 5,
      "firstname": "Endah",
      "lastname": "Sukamti",
    },
    {
      "id": 6,
      "firstname": "Fiona",
      "lastname": "Lim",
    },
    {
      "id": 7,
      "firstname": "Gerry",
      "lastname": "Geraldi",
    }
  ]

  ngOnInit() {
  }

}
