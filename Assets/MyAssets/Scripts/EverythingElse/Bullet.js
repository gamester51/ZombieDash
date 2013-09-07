#pragma strict

//Insert name of game Here
//Bullet Script
//Developed by InsaneGamer.net and Frafjord LLC
//Copyright 2013


//simple loop to destroy gameobject(bullet) after a certain amount of time
function Update () 
{
	Destroy(gameObject, .25);
}