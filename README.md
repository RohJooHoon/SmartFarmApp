# 시작

node -v : <kbd>v22.3.0</kbd>

이 프로젝트는 <kbd>npx react-native init MyApp --template react-native-template-typescript</kbd>을 사용하여 부트스트랩 한 **React Native typescript** 프로젝트입니다.

## 실행

1. [Chocolatey](https://chocolatey.org/install)(Window) or [brew](https://brew.sh/ko/)(mac), [Xcode](https://developer.apple.com/kr/xcode/)(mac), [Android Studio](https://developer.android.com/studio/?gclid=Cj0KCQiAjJOQBhCkARIsAEKMtO3zEhdK4_I0CEZic3UH4dl-9gVXuHFR9dCl3TOHKjmv3xWLU3UxfhYaApfAEALw_wcB&gclsrc=aw.ds&hl=ko), [node](https://nodejs.org/en/download/package-manager) 가 설치 되어 있는지 확인 합니다.

2. React Native 프로젝트의 루트에서 새로운 터미널을 열고 다음 명령어를 실행하여 **Android** 또는 **iOS** 앱을 시작하세요.

   ```bash
   # npm 사용
   npm run start

   # yarn 사용
   yarn start
   ```

3. 이후 출력되는 선택지에서 원하는 동작을 선택합니다.

   **Android** : <kbd>a</kbd>  
   **ios** : <kbd>i</kbd>

<br>모든 설정이 제대로 완료되었다면, 에뮬레이터 / 시뮬레이터에서 새로운 앱이 실행되는 것을 볼 수 있으며, Android Studio와 Xcode에서도 직접 앱을 실행할 수 있습니다.

## 디버깅

1. 구조 및 콘솔 확인을 위해, 디버깅 툴(React Native Debugger)을 설치 후 실행 합니다.

   **Android** : [직접 설치](https://github.com/jhen0409/react-native-debugger/releases)

   **ios** : <kbd>brew install --cask react-native-debugger</kbd>

   **공통** : [react-native-devsettings](https://www.npmjs.com/package/react-native-devsettings?activeTab=readme)
   <br><br>

2. 시뮬레이터 에서 관리자 도구를 실행합니다.

   **Android**: <kbd>control + d</kbd> 또는 <kbd>control + m</kbd> -> “Debug” 선택

   **iOS**: <kbd>cmd + d</kbd> 또는 <kbd>cmd + m</kbd> -> “Debug” 선택
   <br><br>

## pod 설치 / 재설치

```bash
cd ./ios
pod install
cd ../
```
