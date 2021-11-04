/*
	IT'S JUST A DEMO FOR DATA TO TRY RUNNING APP
	AND I WILL CHANGE IT TO BE IMPORTED AUTOMATICALLY FROM DATABASE
*/

import bcrypt from 'bcrypt';

const data = {
	users: [
		{
			firstName: "emad",
			lastName: "elnagar",
			email: "emad@gmail.com",
			password: bcrypt.hashSync('br1234', 8),
			phoneNumber: "",
			gender: "male",
			isAdmin: true,
		},
		{
			firstName: "ahmed",
			lastName: "adel",
			email: "ahmed@gmail.com",
			password: bcrypt.hashSync('fe1245', 8),
			phoneNumber: "",
			gender: "male",
			isAdmin: false,
		},
	],
  products: [
		{
			name: 'men suit',
			price: 120,
			countInStock: 10,
			category: 'fashion',
			image:'/images/benjamin-rascoe-Ci_fZ5cL9Jo-unsplash.jpg',
			brand:'Gucci',
			rating: 4.5,
			reviesNum: 15,
			description: 'Good suit for your dates',
		},
		{
			name: 'camera lens',
			price: 90,
			countInStock: 15,
			category: 'photography',
			image:'/images/ali-nafezarefi-ce5r6_SQREQ-unsplash.jpg',
			brand:'canon',
			rating: 4.7,
			reviesNum: 11,
			description: 'a very good lens to profitional photos',
		},
		{
			name: 'blue suit',
			price: 100,
			countInStock: 22,
			category: 'fashion',
			image:'/images/benjamin-rascoe-jXzyR6tgd18-unsplash.jpg',
			brand:'Brioni',
			rating: 4.9,
			reviesNum: 29,
			description: 'Good suit for your dates',
		},
		{
			name: 'iphone',
			price: 710,
			countInStock: 11,
			category: 'electronics',
			image:'/images/pexels-carlos-jairo-7989741.jpg',
			brand:'apple',
			rating: 4.3,
			reviesNum: 17,
			description: 'apple iphone for the best',
		},
		{
			name: 'modern sallon',
			price: 1880,
			countInStock: 0,
			category: 'furniture',
			image:'/images/spacejoy-vPKNB_gc23Q-unsplash.jpg',
			brand:'ikea',
			rating: 4.6,
			reviesNum: 22,
			description: 'modern and cheap price salon',
		},
	],
};
export default data;