# .bashrc

# User specific aliases and functions

export TERM='xterm-256color'
export LS_COLORS="di=91;40":"ex=0;42":"ln=96;40":"so=93;40"

alias ls='ls --color=auto -Crh'
alias l='ls --color=auto -al'
alias ll='ls --color=auto -Ctrhl'

alias cp='cp -i'
alias mv='mv -i'

alias vv='vim main.c'
alias c='clear'
alias v='vim'

alias u='cd ../'
alias uu='cd ../../'
alias du='du -sh ./*'

alias port='netstat -an | grep "LISTEN "'

alias ker='cd ~/kernel'
alias code='cd ~/code'

alias mkp='. ~/sh/mk_project.sh'

if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi
export PATH=${PATH}:$HOME/gsutil
export PYTHONPATH=${PYTHONPATH}:$HOME/gsutil/third_party/boto:$HOME/gsutil

PS1="\[\033[35m\][\u@\w]\[\033[00m\] # "


