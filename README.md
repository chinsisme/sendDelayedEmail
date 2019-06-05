# Sending delayed email using message broker

This is an API to send an email with a configurable delay.

## Set-up

This API uses kue as the message broker, for which Redis needs to be present on the system.

1. Install Redis-
```bash
cd /tmp
curl -O http://download.redis.io/redis-stable.tar.gz
tar xzvf redis-stable.tar.gz
cd redis-stable
make
make test
sudo make install
sudo mkdir /etc/redis
cd
sudo cp /tmp/redis-stable/redis.conf /etc/redis
sudo nano /etc/redis/redis.conf
sudo nano /etc/systemd/system/redis.service
sudo adduser --system --group --no-create-home redis
sudo mkdir /var/lib/redis
sudo chown redis:redis /var/lib/redis
sudo chmod 770 /var/lib/redis
sudo systemctl start redis
sudo systemctl status redis
redis-cli
sudo systemctl restart redis
redis-cli
sudo systemctl enable redis
```
2. Download this git repository

3. On this folder, run `npm install` to install all npm packages

4. Set environment variables -

```bash
set EMAIL_ID=<your email ID>
set PASSWORD=<your email password>
```

## Usage

```bash
nodemon # If you have installed nodemon, if not run npm i -g nodemon
# Or
node index.js
```
### Send HTTP request
Type: POST<br>
URL: http://localhost:2000/sendDelayedEmail<br>
form-data:<br>
    Emailid: "sushrutk@move78ai.com",<br>
    Timeout: 500,<br>
    Data: "mkjcskkmaknmkln1kmklnc;klnljqbdsahjhkjhjk",<br>
    FileName: "test.png"<br>


## API Flow
![Alt text](api_flow.png?raw=true "API Flow")