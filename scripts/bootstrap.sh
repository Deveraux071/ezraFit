if [[ $(command -v brew) == "" ]]; then
    echo "Installing Hombrew"
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo "Updating Homebrew"
    brew update
fi

echo "Installing python3"
brew install python3


cd frontend
npm install
cd -
cd backend
python3 -m venv be
source be/bin/activate
python3 -m pip install pip
pip install -r requirements.txt
pip3 install firebase 