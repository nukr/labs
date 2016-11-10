#!/bin/bash

echo "server starting ..." && node index.js&

sleep 1 \
  && export NODE_PID=`lsof -i :3000 | grep node | head -n 1 | awk '{print $2}'` \
  && echo $NODE_PID \
  && sleep 3 \
  && kill -term $NODE_PID \
  &

wait

echo "done"
