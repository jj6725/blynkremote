if ps -ef | grep -v grep | grep "node /home/jj/Workspace/blynk/remote.js"; then
    echo "Blynk: Remote is already running"
else
    node /home/jj/Workspace/blynk/remote.js >> /home/jj/Workspace/blynk/logs &
fi
exit 0
