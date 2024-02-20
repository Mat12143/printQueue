// Includi nel progetto la libreria NewPing
#include "NewPing.h"

// Collegare il pin 8 di Arduino al Trigger  
// ed il pin 9 all' Echo del sensore HC-SR04.
#define TRIGGER_PIN 8
#define ECHO_PIN 9

// Distanza massima per cui vogliamo eseguire il ping (in centimetri).
#define MAX_DISTANCE 400	

// Settaggi del NewPing dei pin e della distanza massima.
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);
float duration, distance;

void setup() 
{
	Serial.begin(9600);
}

void loop() 
{
	// Invia ping, ottieni distanza in cm
	distance = sonar.ping_cm();
	
	// Invia i risultati al Serial Monitor
	Serial.print("Distanza = ");
	
	if (distance >= 400 || distance <= 2) 
	{
		Serial.println("Fuori campo");
	}
	else 
	{
		Serial.print(distance);
		Serial.println(" cm");
	}
	delay(500);
}