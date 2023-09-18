# OurSpace Web App

![Kapture 2023-09-17 at 20 15 32](https://github.com/karenxiong/ourspace/assets/14854168/2e898ec7-5ef3-4edd-b06c-391fa089b4a4)

OurSpace is a social platform where homeowners and interior design enthusiasts can share their home interior designs, connect with like-minded people, and get inspired. With OurSpace, users can upload images of their home and highlight each item in the image with an external link to let others know where to purchase it. 

Other users can **view** and **like** posts, and **visit** user profiles to see posts that are uploaded by the selected user. OurSpace is the perfect place to get inspired, discover new home decor ideas, and showcase your own unique styles.

---

#### Example of image posting with product tagging
![Kapture 2023-09-17 at 21 51 38](https://github.com/karenxiong/ourspace/assets/14854168/5ff2357d-7800-42aa-9430-783063cec9c9)

## Project requirements

To run OurSpace, you must have `node v18.14.2` installed. 

Setup Auth0 by following instructions of [Auth0's documentation](https://auth0.com/docs/quickstart/spa/react/interactive) to obtain a Domain, Client ID and its Client Secret key.
These are required to setup the app's authentication and login.

Once you have obtained the following information, please replace the Domain, Client ID, and Audience (Client Secret key) found in `src/index.js` and `src/auth_config.json`.


## Project setup

OurSpace has a backend server that is required to run for the app to be functional. Please visit [OurSpace Backend repository](https://github.com/karenxiong/ourspace-backend) to follow the installation guide.

Once you have the backend running, please follow the instructions on how to run the current OurSpace client side:

Use `npm` to install the project dependencies:

```bash
npm install
```

Once the project dependencies have successfully installed, use `npm` to start the app:

```bash
npm start
```

You can now access OurSpace with the following URL:

```bash
localhost:3000
```

## FAQ

### How do I signup/login?

When visiting OurSpace for the first time, you can login or signup by clicking on the Login button which will redirect you to a login page. You can then easily signup or login by continuing with one of the listed social accounts.


### How do I like or upload a post?

You must be logged in to like or upload posts.

