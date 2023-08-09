#![allow(dead_code)]

use std::process::{Command, Stdio};
use std::io::{stdout, Write};
use curl::easy::Easy;

fn curl_request() {
    let mut easy = Easy::new();
    easy.url("https://www.rust-lang.org/").unwrap();
    easy.write_function(|data| {
        stdout().write_all(data).unwrap();
        Ok(data.len())
    }).unwrap();
    easy.perform().unwrap();

    println!("{}", easy.response_code().unwrap());
}

fn cmd_issue() {
    let cmd = Command::new("lsof")
    .arg("-i")
    .arg("-P")
    .arg("-n")
    .stdout(Stdio::piped())
    .spawn()
    .unwrap();

    let cmd1 = Command::new("grep")
    .arg("LISTEN")
    .stdin(Stdio::from(cmd.stdout.unwrap())) // Pipe through.
    // .stdout(Stdio::piped())
    .spawn()
    .unwrap();

    let output = cmd1.wait_with_output().unwrap();
    let result = String::from_utf8_lossy(&output.stdout);
    println!("{}", result);

}

fn main() {
    cmd_issue()
}