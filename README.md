# Keep Awake Heroku
Keep your Heroku awake for certain hours.

## Usage
> DISCLAIMER: This app is still in development, feel free to contributing.

From now on, if you want to make your heroku app awake, you need to send http request to this following endpoint:

### Add App
```bash
https://keepawakeheroku.herokuapp.com/app
```

| Method | Body  | Required | Type   |
| ---    | ---   | ---      | ---    |
| POST   | app   | yes      | string |
| POST   | start | no       | int    |
| POST   | end   | no       | int    |

### Delete App
```bash
https://keepawakeheroku.herokuapp.com/app
```

| Method | Body  | Required | Type   |
| ---    | ---   | ---      | ---    |
| DELETE | app   | yes      | string |

Old instruction:  
~~From now on, if you want to make your heroku app awake, you need to write manually on line 7 index.js~~

```javascript
let urls = [{ app: "react-yoram", start: 00, end: 23 }];
```

### ✨ Body Parameter Explanation
app = is your heroku app name  
start = is when your app will start running, e.g. 07 means 07:00 AM  
end = is when your app will stop running, e.g. 18 means 06:00 PM

*to make your app running 24/7, ~~put start and end to 00 and 00~~, just don't pass start and end parameter

*NOTE: the time is using WIB/GMT+7 timezone (Jakarta) with 24 format*

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
