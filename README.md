# Anime Catalog

---

- [📚 Getting Started](#-Getting-Started)
- [🗺 Project Layout](#-project-layout)

Anime catalog is a simple react native application that contains necessary functionality to list, view and add to favorite Anime.

## Sample Recording
https://user-images.githubusercontent.com/24902197/190944172-480be81c-4e15-430a-80cf-17ccbfe237c5.mov


## 📚 Getting Started

> To start the project with the following command

`$ yarn install | cd ios | pod install`

> You may start the project with the following command

`$ yarn ios `
`$ yarn android`


> What are the platforms that are available in this projects?

:heavy_check_mark:
`android`, `iOS`


## 🗺 Project Layout

### State Management: Redux, Redux-Saga
###  UI Library: React Native Paper, Native Components

### Folder Structure: Duck
- [React/Redux File Architecture: Ducks It Up!](https://medium.com/building-crowdriff/react-redux-file-architecture-ducks-it-up-6b32eaaba341)
	- [`assets`] All the source code for the Unimodules, if you want to edit a library or just see how it works this is where you'll find it.
	- [`modules`] The components folder is home to your React components - Contains all 'dumb' or presentational components
		- [`src`] Contains all corresponding components with logic in them where it include the components mostly and all redux actions such as actions, reducers
		- [`screens`] The UI components of each screens
		- [`typings`] The definition of types that laid under the modules


### Resource
1. https://docs.api.jikan.moe
