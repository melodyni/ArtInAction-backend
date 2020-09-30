git clone https://github.com/melodyni/ArtInAction-react frontend ;

cd frontend;
npm install;
npm test;
npm run build;
mv ./build ..;
cd ..;
npm install;
rm -rf frontend;