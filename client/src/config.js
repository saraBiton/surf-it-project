import { Platform } from 'react-native';

const url = {
    web: 'http://localhost:8000/',
    android: 'http://10.0.2.2w:8000/'
}

const basicUrl = url.web;

export { basicUrl };

function get_url() {
    if (Platform.OS = 'android') {
        return "http://10.0.2.2w:8000/"; //running on android

    } else if (Platform.OS = 'web') {
        return 'http://localhost:8000/';
    }
}