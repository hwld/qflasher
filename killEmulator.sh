# windowsでgit bashを使ってる
netstat -aon | grep -E "(4000|8080|9099|5000).+LISTENING" | awk '{print "//pid " $5}' | xargs taskkill //f