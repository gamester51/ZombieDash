#pragma strict

//player variables
var mySprite : PackedSprite; //variable for art

//movement variables
var speeD : float; //variable for speed, set in inspector
var jumpspeeD : float; //variable for jumpspeed, set in inspector

var autoMove : boolean = false; //variable to tell developer whether or not player is set to automatically move

var canJump : boolean; //variable to see if player is on ground

function Start () 
{

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
}