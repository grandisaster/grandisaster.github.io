import bridge from '@vkontakte/vk-bridge';

export default class Data {
    setKey(key, value) {
        const answer = bridge.send("VKWebAppStorageSet", {"key": key, "value": value});
        return answer["data"]["result"] === true;
    }

    getKey(key) {
        const answer = bridge.send("VKWebAppStorageGet", {"keys": [key]});
        return answer["data"]["keys"][0]["value"];
    }

    sendBridge() {
        bridge.send("VKWebAppInit", {});
    }
}