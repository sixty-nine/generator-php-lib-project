<?php

namespace <%= project.phpNamespace.replace('\\\\', '\\') %>\Tests;

use PHPUnit\Framework\TestCase;
use <%= project.phpNamespace.replace('\\\\', '\\') %>\Hello;

class HelloTest extends TestCase
{
    public function testHello()
    {
        $hello = new Hello();
        $this->assertEquals('Hello world', $hello->hello('world'));
    }
}
