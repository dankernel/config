# .bashrc

# User specific aliases and functions

export TERM='xterm-256color'
export LS_COLORS="di=91;40":"ex=0;42":"ln=96;40":"so=93;40"

# Grep
export GREP_OPTIONS='--color=auto'
export GREP_OPTIONS='--color=always' GREP_COLOR='1;32' 

# Ls
alias ls='ls --color=auto -Crh'
alias l='ls --color=auto -al'
alias ll='ls --color=auto -Ctrhl'

# App
alias s='screen'
alias v='vim'
alias vv='vim main.c'
alias p='ping google.com'
alias config='gnome-control-center'
alias conky='/home/dkdk/sh/conky/conky.sh'

# System
alias port='netstat -an | grep "LISTEN "'
alias cp='cp -i'
alias mv='mv -i'
alias du='du -sh ./*'
alias c='clear'

# Cd
alias u='cd ../'
alias ker='cd ~/kernel'
alias code='cd ~/code'
alias uu='cd ../../'

# Sheel
alias mkp='. ~/sh/mk_project.sh'
alias backup='. ~/sh/backup.sh'

if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi
export PATH=${PATH}:$HOME/gsutil
export PYTHONPATH=${PYTHONPATH}:$HOME/gsutil/third_party/boto:$HOME/gsutil
export PATH="$PATH:/opt/java/bin:/opt/android-sdk/tools:/opt/android-sdk/platform-tools:/usr/share/java/apache-ant/bin:/opt/android-ndk:/opt/android-ndk/build/tools:"
export JAVA_HOME="/opt/java/"
export CLASSPATH=".:/opt/java/jre/lib/rt.jar:/opt/android-sdk/platforms/android-16/android.jar" 


PS1="\[\033[35m\][\u@\w]\[\033[00m\] $ "

