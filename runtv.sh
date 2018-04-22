if ps -ef | grep -v grep | grep "node /home/jj/Workspace/blynk/tv.js"; then
	echo "TV App is already running"
else
	node /home/jj/Workspace/blynk/tv.js >> /home/jj/Workspace/blynk/logs &
fi

if ps -ef | grep -v grep | grep "node /home/jj/Workspace/blynk/lights.js"; then
	echo "Light app is already running"
else
	node /home/jj/Workspace/blynk/lights.js >> /home/jj/Workspace/blynk/lightlogs &
fi

exit 0