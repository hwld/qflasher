# firebaeのエミュレータが生きてることがあるのでシャットダウンする
# windowsでgit bashを使ってる
netstat -aon | grep -E "(4000|8080|9099|5000).+LISTENING" | awk '{print  $5}' | sort | uniq | xargs -I {} taskkill //f //pid {}