# react-native-threesixty

mimic 360degree behaviour with multiple images

## Installation

```sh
npm install react-native-threesixty
```

## Usage

```js
import { Image360 } from 'react-native-threesixty';

// ...

<Image360
  urls={[]}
  ImageComponent={Image} // can use FastImage for better perf in android
  loader={<ActivityIndicator />}
  imageStyle={{ height: 240, width: 360 }}
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
