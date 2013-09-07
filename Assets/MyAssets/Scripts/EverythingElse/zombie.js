#pragma strict

function Start () 
{

}

//function to check collision
function OnCollisionEnter(other : Collision) 
{
	//checking to see if bullet collided with zombie
	if(other.gameObject.tag == "bullet")
	{
		//move zombies position back so player doesnt collide while animation is playing
		transform.position.z = -5;
		//destroy bullet
		Destroy(gameObject, 0.25);
	}
}

function Update () 
{

}