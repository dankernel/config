# .bashrc

# User specific aliases and functions

export TERM='xterm-256color'
export LS_COLORS="di=91;40":"ex=0;42":"ln=96;40":"so=93;40"

#Ls
alias ls='ls --color=auto -Crh'
alias l='ls --color=auto -al'
alias ll='ls --color=auto -Ctrhl'

#App
alias s='screen'
alias v='vim'
alias vv='vim main.c'
alias p='ping google.com'

#System
alias port='netstat -an | grep "LISTEN "'
alias cp='cp -i'
alias mv='mv -i'
alias du='du -sh ./*'
alias c='clear'

#Cd
alias u='cd ../'
alias ker='cd ~/kernel'
alias code='cd ~/code'
alias uu='cd ../../'

#Sheel
alias mkp='. ~/sh/mk_project.sh'
alias backup='. ~/sh/backup.sh'

if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi
export PATH=${PATH}:$HOME/gsutil
export PYTHONPATH=${PYTHONPATH}:$HOME/gsutil/third_party/boto:$HOME/gsutil

PS1="\[\033[35m\][\u@\w]\[\033[00m\] $ "


