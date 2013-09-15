#pragma strict

//Insert name of game Here
//Player Script
//Developed by InsaneGamer.net and Frafjord LLC
//Copyright 2013

//player variables
var mySprite : PackedSprite; //variable for art
var spawnPoint : Transform; //spawn poiont transform

//movement variables
var speeD : float; //variable for speed, set in inspector
var jumpspeeD : float; //variable for jumpspeed, set in inspector

var autoMove : boolean = false; //variable to tell developer whether or not player is set to automatically move

var isPaused : boolean; //variable to tell if game is paused

var canJump : boolean; //variable to see if player is on ground

var attemptS : int; //attempts counter, goes up when you die
//shooting variables
var canShoot : boolean; // variable to set cooldown
var shootCool : float; //variable for cooldown
var bulletPrefab : Transform; //variable for actual gameobject reference...set in inspector
var bulletSpeed : float; //self explanatory

//function that set variables and runs functions when LEVEL starts
function Start () 
{
	//set the game time to 1(1=on)
	Time.timeScale = 1;
	//set isPaused variable to off
	isPaused = false;
	//spawn the player
	Spawn ();
}

//function for spawning...not fish
function Spawn ()
{
	//set players transform to match spawn points transform
	transform.position = spawnPoint.position;
	//turn autoMove on
	autoMove = true;
}

//function for death and effects
function Death ()
{
	// TEMP code, when more levels are aviable will edit this code
	Application.LoadLevel(Application.loadedLevel);//reloads current level
}
//function to add an attempt everytime you respawn
function AttemptsCounter ()
{
	//add one to the atempts counter
	attemptS ++;
	//respawn
	Death ();
}

//function to pause game
function Pause ()
{
	//the game is paused
	isPaused = true;
	//change game time to 0(o=off)
	Time.timeScale = 0;
}

//function to unpause game
function UnPause ()
{
	//the game is unpaused
	isPaused = false;
	//set the game time to 1(1=on)
	Time.timeScale = 1;
}

//function to determine collisioon with objects
function OnCollisionEnter(other : Collision) 
{
	//checking to see if player is touching ground
	if(other.gameObject.tag == "Floor")
	{
		//if player is touching ground, canjump is true
		canJump = true;
	}
	//checking to see if player collided with zombie
	if(other.gameObject.tag == "zombie")
	{
		//turn auto move off
		autoMove = false;
		//turn off ability to jump
		canJump = false;
		//run zombie attack function
		ZombieAttack ();
	}
}

//function for zombie attacks
function ZombieAttack ()
{
	//turn off canJump(redundancy)
	canJump = false;
	//wait for a certain amount of time for animation
	yield WaitForSeconds(0.5);
	// run attempts counter function
	AttemptsCounter ();
}

//function for when player is moving
function IsMoving ()
{
	//player is moving along x-axis multiplied by speed
	rigidbody.velocity.x = speeD;
}

//functon for when player is NOT moving
function IsNotMoving ()
{
	//players speed is set to 0
	rigidbody.velocity.x = 0;
}

function Update () 
{
	//so the games screen doesnt go to sleep
	Screen.sleepTimeout = SleepTimeout.NeverSleep;
	//if automove is false, call this function
	if(!autoMove)
	{
		IsNotMoving ();
	}
	//if automove is true, call this function
	if(autoMove)
	{
		IsMoving ();
	}
		//if player canjump, do this
	if(canJump)
	{
		//if jump button(space) is pressed
		if(Input.GetButtonDown("Jump"))
		{
			//apply jump speed to y-axis
			rigidbody.velocity.y = jumpspeeD;
			canJump = false; //set canjump variable to false as not to continue jumping
		}
	}
	if(Input.GetKey("b"))// when "b" is pressed, the player shoots
	{
		if(canShoot) // check to see if player can shoot
		{
			// name the variable..create it...choose what to create...find WHERE to create it, which position is located, and which direction is it facing
			var shotGun = Instantiate(bulletPrefab, GameObject.Find("shotgunSpawn").transform.position, Quaternion.identity);
			// add force(movement) to created object, which direction and how fast
			shotGun.rigidbody.AddForce(transform.right * bulletSpeed);
			//shoot cooldown number(arbitrary)
			shootCool = 1;
		}
	}
	//if the ESC key is pressed
	if(Input.GetKey(KeyCode.Escape) && !isPaused)
	{
		//run the Pause function
		Pause ();
	}
	
	//if the enter key is pressed
	if(Input.GetKey(KeyCode.Return) && isPaused)
	{
		//run the UnPause function
		UnPause ();
	}
	//shoot cooldown code
	if(shootCool > 0)
	{
		// if cooldown is greater than 0, decrease it every second/frame
		shootCool -= Time.deltaTime;
		//make sure player cant shoot(redundancy check)
		canShoot = false;
	}
	if(shootCool == 0)
	{
		//if cooldown =0. then it equals 0
		shootCool = 0;
		//player can shoot
		canShoot = true;
	}
	if(shootCool < 0)
	{
		//redundancy check...make sure cooldwon never goes below 0
		shootCool = 0;
		//player can shoot
		canShoot = true;
	}
}