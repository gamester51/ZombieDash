#pragma strict

//Insert name of game Here
//Bullet Script
//Developed by InsaneGamer.net and Frafjord LLC
//Copyright 2013

//function to check collision
function OnCollisionEnter(other : Collision) 
{
	//checking to see if bullet collided with zombie
	if(other.gameObject.tag == "zombie")
	{
		//destroy bullet
		Destroy(gameObject);
	}
}


//simple loop to destroy gameobject(bullet) after a certain amount of time
function Update () 
{
	Destroy(gameObject, .25);
}